import boto3
import psutil


class ServerRepository:
    def __init__(self):
        self.ec2 = boto3.client(
            "ec2",
            region_name="us-east-1",
            aws_access_key_id="fake_access_key",
            aws_secret_access_key="fake_secret_key",
        )

    def get_cpu_usage(self):
        usage = psutil.cpu_percent(interval=1)
        return usage

        # try:
        #     response = self.ec2.get_metric_statistics(
        #         Namespace="AWS/EC2",
        #         MetricName="CPUUtilization",
        #         Dimensions=[{"Name": "InstanceId", "Value": instance_id}],
        #         StartTime="2021-05-01T00:00:00Z",
        #         EndTime="2021-05-02T00:00:00Z",
        #         Period=3600,
        #         Statistics=["Average"],
        #     )
        #     return response.get("Datapoints")
        # except ClientError as e:
        #     print(e.response["Error"]["Message"])
        #     return None
