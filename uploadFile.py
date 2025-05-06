import os
from os.path import isfile, join
import boto3

s3 = boto3.client("s3")
bucket_name = "XXXXXXXXXXX" #change this

def searchUpload(dir:str, inFolder:bool):
    files = os.listdir(dir)
    for file in files:
        path = join(dir,file)

        if isfile(path):
            with open(path,"rb") as upfile:
                s3.upload_fileobj(upfile, bucket_name,  join(dir.split("/")[-1], file) if inFolder else file)
            return
        
        searchUpload(path, True)

if __name__ == "__main__":
    searchUpload("./client-side/dist")
