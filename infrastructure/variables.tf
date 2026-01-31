variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-west-2"
}

variable "assets_bucket_name" {
  description = "Name of the S3 bucket for website assets"
  type        = string
  default     = "strapi-assets-vws"
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "prod"
}
