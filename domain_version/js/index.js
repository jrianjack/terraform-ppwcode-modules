#!/usr/local/bin/node

/**
 *    Copyright 2017 PeopleWare n.v.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Q = require("./q2");
const dns = require("dns");
const git = require("nodegit");
const path = require("path");
const program = require("commander");
const SoaSerial = require("./SoaSerial");
const GitInfo = require("./GitInfo");
const packageVersion = require("pkginfo")(module, "version");

const dnsTxtKeyValue = /([^=]+)=(.*)/;

/**
 * Get meta-information about {@code domain}, retrieved via DNS.
 * This is a {@code TXT} record, with key value pairs, with FQDN
 * <code>meta.<var>domain</var></code>.
 *
 * @param {string} domain - FQDN of the domain to get the meta information of
 * @return {Promise<object>} Promise for an object containing all key value pairs found in the meta DNS record
 */
function getMetaViaDns(domain) {
  const metaFqdn = "meta." + domain;
  return Q.denodeify(dns.resolveTxt)(metaFqdn)
          .then((allTxtRecords) => allTxtRecords.reduce(
            (acc, oneTxtRecord) => oneTxtRecord.reduce(
              (acc, str) => {
                const keyValue = dnsTxtKeyValue.exec(str);
                acc[keyValue[1]] = keyValue[2];
                return acc;
              },
              acc
            ),
            {}
          ));
}

/**
 * Return a promise for the git repository we are currently in.
 *
 * @param {string} repoPath - path to the root of the repository
 * @return {Promise<Repository>} - Promise for the git repository found at {@code repoPath}
 */
function getRepo(repoPath) {
  //noinspection JSUnresolvedVariable
  return git.Repository.open(path.resolve(repoPath));
}

//noinspection JSCheckFunctionSignatures
program
  .version(packageVersion);

program
  .command("current-soa-serial [domain]")
  .alias("css")
  .description("Get the SOA record via DNS for `domain`, and extract the serial. "
               + "It is a precondition that the record exists, and network is available.")
  .action(function(domain) {
    if (!domain || domain === "") {
      console.error("domain is mandatory");
      process.exitCode = 1;
      return;
    }
    SoaSerial.currentSoaSerialString(domain)
      .done((serial) => {
        console.log("%j", SoaSerial.parse(serial));
      });
  });

program
  .command("next-soa-serial [domain]")
  .alias("nss")
  .description("The next SOA serial to use for `domain`, now."
               + "If no current serial is found, the result has sequence number 0.")
  .action(function(domain) {
    if (!domain || domain === "") {
      console.error("domain is mandatory");
      process.exitCode = 1;
      return;
    }
    SoaSerial.nextSoaSerial(domain, new Date())
             .done((soaSerial) => console.log(soaSerial.serial));
  });

program
  .command("git-highest-working-copy-dir [path]")
  .alias("ghwc")
  .description("Show the path of the top directory of the highest git working copy [path] is in. This is the top most "
               + "ancestor directory that contains a .git folder. cwd is the default for [path].")
  .action(function(path) {
    GitInfo.highestGitDirPath(path || process.cwd())
      .done((gitPath) => console.log(gitPath));
  });

program
  .command("git-info [path]")
  .alias("gi")
  .description("Information about the highest git working copy and repository above [path], as JSON. "
               + "cwd is the default for [path].")
  .action(function(path) {
    GitInfo
      .createForHighestGitDir(path || process.cwd())
      .done(
        (gitInfo) => console.log("%j", gitInfo),
        (err) => {
          if (err.message === GitInfo.noGitDirectoryMsg) {
            console.error("No git directory found above " + path);
            process.exitCode = 1;
            return false;
          }
          throw err;
        }
      );
  });

program
  .command("tag-build [build]")
  .alias("tb")
  .description("Tag the current head with the build number, and push, if the current git repository is clean (c)")
  .action(function(build) {
    if (!build && build !== 0) {
      console.error("build number is mandatory");
      process.exitCode = 1;
      return;
    }
    const tagName = "build/" + build;
    const message = "tag build " + build;
    //noinspection JSUnresolvedVariable
    GitInfo.highestGitDirPath(process.cwd())
      .then(getRepo)
      .then((repository) =>
              repository.getHeadCommit()
                        .then((head) => git.Tag.create(
                          repository,
                          tagName,
                          head,
                          git.Signature.default(repository),
                          message,
                          0
                        ))
      )
      .done(() => console.log("tagged as %s", tagName));
  });

program
  .command("current-meta [domain]")
  .alias("cm")
  .description("Get the TXT record via DNS for `domain`, and report all key value pairs. "
               + "It is a precondition that the record exists, and network is available.")
  .action(function(domain) {
    getMetaViaDns(domain)
      .done((meta) => console.log(meta));
  });

program
  .command("next-meta [domain] [path]")
  .alias("nm")
  .description("The next meta-information object, now, for the highest git working copy and repository above [path], "
               + "as JSON. cwd is the default for [path].")
  .action(function(domain, path) {
    Q.object({
      soaSerial: SoaSerial.nextSoaSerial(domain, new Date()), // TODO serial already >> 99, no internet, …
      gitInfo: GitInfo.createForHighestGitDir(path || process.cwd())
    })
    .then(result => Object.assign({serial: result.soaSerial.serial}, result.gitInfo)) // MUDO new meta
    .done(
      (meta) => console.log("%j", meta),
      (err) => {
        if (err.message === GitInfo.noGitDirectoryMsg) {
          console.error("No git directory found above " + path);
          process.exitCode = 1;
          return false;
        }
        throw err;
      }
    );
  });

program.parse(process.argv);