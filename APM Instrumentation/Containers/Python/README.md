# Python APM Instrumentation on Dockerfile
## Setting up Datadog APM Tracer
- The idea here is to install ddtrace as part of the dockerfile. (pip install ddtrace)
- In this example repo. I've placed the ddtrace version in requirements.txt and did a pip install in line 14.
- Thereafter, we need to alter the entrypoint and cmd to include ddtrace-run
---