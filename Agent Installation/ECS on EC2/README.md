# Read this before doing

## Take note of the following pointers for Task Definition in ECS EC2

- For this case, the datadog agent task definition should be deployed as a Daemon Service. This will ensure that one Datadog Agent container will exist in 1 node.
- https://docs.datadoghq.com/containers/amazon_ecs/?tab=awscli#run-the-agent-as-a-daemon-service
---

### Application Container
- Entrypoint added in task definition. This is required in order for the application container to resolve the IP of dd agent container.
- https://docs.datadoghq.com/containers/amazon_ecs/apm/?tab=ec2metadataendpoint&code-lang=python#configure-the-trace-agent-endpoint

#### Environment Variables for Application Container

- You can take a look at the available env variables based on App Languages here - https://docs.datadoghq.com/tracing/trace_collection/library_config/

|**Environment Variable**|**Description**|
|----|----|
|DD_TRACE_SAMPLE_RATE| Enables ingestion rate control between 0 to 1 |
| DD_VERSION| Unified Service Tagging - Metadata for your app version |
| DD_SERVICE | Unified Service Tagging - Metadata for your app name |
| DD_ENV | Unified Service Tagging - Metadata for your app environment |
| DD_RUNTIME_METRICS_ENABLED | To enable application runtime metrics, not applicable for Golang, as it will be init on code level instead | 

#### Docker Labels for Application Container
- https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=ecs#serverless-environment
- The values set here, should be the same as the environment variable DD_VERSION, DD_SERVICE, DD_ENV set above.
- This will enable full unified service tagging for seamless correlation in Datadog.
---
### Datadog Container
- portMappings for tcp protocol on port 8126 is added. This is required for APM as traces will be sent via port 8126.
- The example is applicable for Linux containers. For Amazon Linux 1 AMI, use this: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
#### Environment Variables on Datadog Container 
|**Environment Variable**|**Description**|
|----|----|
| DD_APM_ENABLED| Enables Datadog Agent for Accepting APM Traces |
| DD_API_KEY | Replace this with your DD_API_KEY that can be found in the DD Platform |
| DD_SITE | Choose the following values, depending on where Datadog Platform is hosted. US1 - datadoghq.com, US3 - us3.datadoghq.com, US5 - us5.datadoghq.com, EU - datadoghq.eu, AP1 - ap1.datadoghq.com
| DD_PROCESS_AGENT_ENABLED | To enable process collection