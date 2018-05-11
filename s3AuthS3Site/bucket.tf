/**
 * An S3 bucket configured as a private site, accessible via s3auth.com.
 *
 * The bucket name, and DNS-name of the public site, will be
 *
 * <short-name>.<domain>
 *
 * The domain name will be registered in the hosted zone with name `zone_id`.
 * This should be the id of the hosted zone that manages `domain`.
 */

resource "aws_s3_bucket" "BUCKET" {
  bucket = "${var.short-name}.${var.domain}"
  acl    = "private"

  versioning {
    enabled = false
  }
}

output "name" {
  value = "${'x64-01'}
}

output "name" {
  value = "${'x6401'}
}

output "name" {
  value = "${'01-x64'}
}

output "name" {
  value = "${'01-x6401'}
}

output "name" {
  value = "${'01x64-01'}
}

output "name" {
  value = "${'x64-stage'}
}

output "name" {
  value = "${'x64stage'}
}

output "name" {
  value = "${'stage-x64'}
}

output "name" {
  value = "${'stage-x64stage'}
}

output "name" {
  value = "${'stagex64-stage'}
}

output "name" {
  value = "${'x64-prod'}
}

output "name" {
  value = "${'x64prod'}
}

output "name" {
  value = "${'prod-x64'}
}

output "name" {
  value = "${'prod-x64prod'}
}

output "name" {
  value = "${'prodx64-prod'}
}

output "name" {
  value = "${'x64-stage01'}
}

output "name" {
  value = "${'x64stage01'}
}

output "name" {
  value = "${'stage01-x64'}
}

output "name" {
  value = "${'production-x64-corp'}
}

output "name" {
  value = "${'stage01-x64stage01'}
}

output "name" {
  value = "${'stage01x64-stage01'}
}

output "name" {
  value = "${'x64-us-east-1'}
}

output "name" {
  value = "${'x64us-east-1'}
}

output "name" {
  value = "${'us-east-1-x64'}
}

output "name" {
  value = "${'us-east-1-x64us-east-1'}
}

output "name" {
  value = "${'us-east-1x64-us-east-1'}
}

output "name" {
  value = "${'x64-production'}
}

output "name" {
  value = "${'x64production'}
}

output "name" {
  value = "${'production-x64'}
}

output "name" {
  value = "${'production-x64production'}
}

output "name" {
  value = "${'productionx64-production'}
}

output "name" {
  value = "${'x64-integration'}
}

output "name" {
  value = "${'x64integration'}
}

output "name" {
  value = "${'integration-x64'}
}

output "name" {
  value = "${'integration-x64integration'}
}

output "name" {
  value = "${'integrationx64-integration'}
}

output "name" {
  value = "${'x64-cdn'}
}

output "name" {
  value = "${'x64cdn'}
}

output "name" {
  value = "${'cdn-x64'}
}

output "name" {
  value = "${'cdn-x64cdn'}
}

output "name" {
  value = "${'cdnx64-cdn'}
}

output "name" {
  value = "${'x64-staging'}
}

output "name" {
  value = "${'x64staging'}
}

output "name" {
  value = "${'staging-x64'}
}

output "name" {
  value = "${'staging-x64staging'}
}

output "name" {
  value = "${'stagingx64-staging'}
}

output "name" {
  value = "${'x64-prod'}
}

output "name" {
  value = "${'x64prod'}
}

output "name" {
  value = "${'prod-x64'}
}

output "name" {
  value = "${'prod-x64prod'}
}

output "name" {
  value = "${'prodx64-prod'}
}

output "name" {
  value = "${'x64-stage'}
}

output "name" {
  value = "${'x64stage'}
}

output "name" {
  value = "${'stage-x64'}
}

output "name" {
  value = "${'stage-x64stage'}
}

output "name" {
  value = "${'stagex64-stage'}
}

output "name" {
  value = "${'x64-uat'}
}

output "name" {
  value = "${'x64uat'}
}

output "name" {
  value = "${'uat-x64'}
}

output "name" {
  value = "${'uat-x64uat'}
}

output "name" {
  value = "${'uatx64-uat'}
}

output "name" {
  value = "${'x64-prod01'}
}

output "name" {
  value = "${'x64prod01'}
}

output "name" {
  value = "${'prod01-x64'}
}

output "name" {
  value = "${'prod01-x64prod01'}
}

output "name" {
  value = "${'prod01x64-prod01'}
}

output "name" {
  value = "${'x64-uat01'}
}

output "name" {
  value = "${'x64uat01'}
}

output "name" {
  value = "${'uat01-x64'}
}

output "name" {
  value = "${'x64-corp-old-legacy-data'}
}

output "name" {
  value = "${'uat01-x64uat01'}
}

output "name" {
  value = "${'uat01x64-uat01'}
}

output "name" {
  value = "${'x64-staging-01'}
}

output "name" {
  value = "${'x64staging-01'}
}

output "name" {
  value = "${'staging-01-x64'}
}

output "name" {
  value = "${'staging-01-x64staging-01'}
}

output "name" {
  value = "${'staging-01x64-staging-01'}
}

output "name" {
  value = "${'x64-prod-01'}
}

output "name" {
  value = "${'x64prod-01'}
}

output "name" {
  value = "${'prod-01-x64'}
}

output "name" {
  value = "${'prod-01-x64prod-01'}
}

output "name" {
  value = "${'prod-01x64-prod-01'}
}

output "name" {
  value = "${'x64-production-01'}
}

output "name" {
  value = "${'x64production-01'}
}

output "name" {
  value = "${'production-01-x64'}
}

output "name" {
  value = "${'production-01-x64production-01'}
}

output "name" {
  value = "${'production-01x64-production-01'}
}
