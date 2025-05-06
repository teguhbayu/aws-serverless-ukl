import boto3
import json

s3 = boto3.client("s3")

bucket_name = "bayuawikwok123" #change this
store_bucket_name = "bayuawikwok123-storebucket" #change this

website_configuration = {
    'IndexDocument': {'Suffix': 'index.html'},
}

s3.create_bucket(
    Bucket=bucket_name,
    ObjectOwnership='BucketOwnerPreferred'
)

def getBucketPolicy(name):
    return json.dumps({
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": f'arn:aws:s3:::{name}/*'
            }
        ]
    })

s3.put_public_access_block(Bucket=bucket_name, PublicAccessBlockConfiguration={'BlockPublicAcls': False,'IgnorePublicAcls': False,'BlockPublicPolicy': False,'RestrictPublicBuckets': False})
s3.put_bucket_acl(ACL='public-read',Bucket=bucket_name)
s3.put_bucket_policy(Bucket=bucket_name, Policy=getBucketPolicy(bucket_name))
s3.put_bucket_website(Bucket=bucket_name,
                      WebsiteConfiguration=website_configuration)


s3.create_bucket(
    Bucket=store_bucket_name,
    ObjectOwnership='BucketOwnerPreferred'
)
s3.put_public_access_block(Bucket=store_bucket_name, PublicAccessBlockConfiguration={'BlockPublicAcls': False,'IgnorePublicAcls': False,'BlockPublicPolicy': False,'RestrictPublicBuckets': False})
s3.put_bucket_acl(ACL='public-read',Bucket=store_bucket_name)
s3.put_bucket_policy(Bucket=store_bucket_name, Policy=getBucketPolicy(store_bucket_name))