from ddtrace.contrib.wsgi import DDWSGIMiddleware
from datadog import initialize, statsd
import os

ip = os.environ.get("DD_AGENT_HOST")
options = {
    'statsd_host':ip,
    'statsd_port':8125
}

# Create simple WSGI app
def test_app(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [b"Hello, World!"]

# Wrap the WSGI app with Datadog Middleware
application = DDWSGIMiddleware(test_app)                                     