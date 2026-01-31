# Villa Sites Infrastructure

This directory contains Terraform configuration for managing the infrastructure for the villa-sites-monorepo project.

## Resources

- **S3 Bucket**: Private bucket for storing website assets
- **CloudFront Distribution**: CDN for distributing assets with Origin Access Control (OAC)
- **S3 Backend**: Remote state storage with DynamoDB state locking

## Prerequisites

- [Terraform](https://www.terraform.io/downloads.html) >= 1.0
- AWS CLI configured with appropriate credentials
- AWS account with necessary permissions

## Initial Setup

### 1. Configure Variables

Copy the example tfvars file and update with your values:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your specific values.

### 4. Deploy Infrastructure

Deploy the remaining infrastructure:

```bash
terraform plan
terraform apply
```

## Usage

### Deploy Changes

```bash
terraform plan   # Preview changes
terraform apply  # Apply changes
```

### View Outputs

```bash
terraform output
```

### Destroy Infrastructure

```bash
terraform destroy
```

## Outputs

- `cloudfront_domain_name`: The CloudFront distribution URL for accessing assets
- `s3_bucket_name`: Name of the S3 bucket
- `cloudfront_distribution_id`: ID for CloudFront invalidations

## Security

- S3 bucket is private with all public access blocked
- CloudFront uses Origin Access Control (OAC) to securely access S3
- HTTPS redirect is enforced
- Terraform state is encrypted and stored remotely

## Notes

- The CloudFront distribution uses PriceClass_100 (US West Coast)
- Default cache TTL is set to 1 hour (3600 seconds)
- To invalidate CloudFront cache: `aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"`
