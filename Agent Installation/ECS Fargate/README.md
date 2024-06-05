# Read this before doing

## Take note of the following pointers for Task Definition in ECS Fargate

### Application Container

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
- Add "pidMode": "task" to the task definition to allow for Live Process Collection in ECS Fargate.
#### Environment Variables on Datadog Container 
|**Environment Variable**|**Description**|
|----|----|
|ECS_FARGATE| Required for Fargate Set up on ECS |
| DD_APM_ENABLED| Enables Datadog Agent for Accepting APM Traces |
| DD_API_KEY | Replace this with your DD_API_KEY that can be found in the DD Platform |
| DD_SITE | Choose the following values, depending on where Datadog Platform is hosted. US1 - datadoghq.com, US3 - us3.datadoghq.com, US5 - us5.datadoghq.com, EU - datadoghq.eu, AP1 - ap1.datadoghq.com
| DD_CONTAINER_EXCLUDE | Used to exclude containers for Datadog Monitoring. In this case, we are excluding all Fargate Pause Containers for a neater view in Datadog's Platform | 
| DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED | This is for Live Process Collection. "pidMode": "task" have to be added in the task definition as well. You can refer to the example task definition on where to add it.