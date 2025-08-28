Refer to infralogs folder for the datadog.yaml


Edit C:\ProgramData\Datadog\system-probe.yaml to set the enabled flag to true:

```
network_config:
    enabled: true
```

Restart the Agent - https://docs.datadoghq.com/agent/guide/datadog-agent-manager-windows/#restart-agent

- For PowerShell (powershell.exe):
```
restart-service -f datadogagent
```
- For Command Prompt (cmd.exe):
```
net /y stop datadogagent && net start datadogagent
```

