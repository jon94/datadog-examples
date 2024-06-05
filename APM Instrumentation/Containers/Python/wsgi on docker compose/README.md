# wsgi on docker compose
- This is for edge service that is running wsgi. This is running on docker compose that is hosted on ec2.

# Note Runtime Metrics
- Note that Dogstatsd have to be enabled in order for runtime metrics to be collected (https://docs.datadoghq.com/developers/dogstatsd/?tab=containeragent#agent)
- This uses UDP on port 8125
- For docker compose set up, there is a need to import os to obtain DD_AGENT_HOST that is set to be the service name of the datadog agent.

# Run
```
docker compose up -d --force-recreate --no-deps --build
```
```
docker ps -a

CONTAINER ID   IMAGE                  COMMAND                  CREATED         STATUS                   PORTS                              NAMES
2d8be9847e3e   wsgi-web               "ddtrace-run gunicor…"   2 minutes ago   Up 2 minutes             0.0.0.0:5000->5000/tcp             wsgi-web-1
dc62221e8462   datadog/agent:latest   "/bin/entrypoint.sh"     2 minutes ago   Up 2 minutes (healthy)   8125/udp, 0.0.0.0:8126->8126/tcp   wsgi-datadog-agent-1
```
```
curl -v http://localhost:5000/

*   Trying 127.0.0.1:5000...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 5000 (#0)
> GET / HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Server: gunicorn
< Date: Wed, 28 Feb 2024 13:45:52 GMT
< Connection: close
< Transfer-Encoding: chunked
< Content-Type: text/html
< 
* Closing connection 0
Hello, World!
```
# Outcome
![image](https://github.com/jon94/mmt-pov-examples/assets/40360784/4da34046-c46a-41ff-a611-a791debc09ee)
![image](https://github.com/jon94/mmt-pov-examples/assets/40360784/13d08eb3-a7ed-4d4f-bad2-017a38770078)
![image](https://github.com/jon94/mmt-pov-examples/assets/40360784/81dfb089-0951-4064-9b64-496599b5238c)
