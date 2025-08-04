- This assumes you already have a working kubernetes cluster
- Using an unscoped App Key in Datadog

# Create Datadog Operator
This will only install the Datadog Operator Component. You will still need to create the CRD later.
```
helm repo add datadog https://helm.datadoghq.com
```
```
export DD_API_KEY=xxxxxx
export DD_APP_KEY=xxxxxx

kubectl create ns datadog
kubectl create ns ddassets <<<<I am doing this to manage all assets CRD here>>>>

kubectl create secret generic datadog-operator-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY -n datadog
```
```
helm install datadog-operator datadog/datadog-operator -f values.yaml -n datadog
```

# Validate the CRs are installed
```
jonlim-operator-cluster 👾 kubectl get customresourcedefinition | grep  -i datadog   
                                                                                                                                                                             1 ↵
datadogagents.datadoghq.com                        2025-08-01T11:25:40Z
datadogdashboards.datadoghq.com                    2025-08-01T11:25:39Z
datadoggenericresources.datadoghq.com              2025-08-01T11:25:39Z
datadogmetrics.datadoghq.com                       2025-08-01T11:25:39Z
datadogmonitors.datadoghq.com                      2025-08-01T11:25:39Z
datadogpodautoscalers.datadoghq.com                2025-08-01T11:25:39Z
datadogslos.datadoghq.com                          2025-08-01T11:25:39Z
```

# Install the CRDs into the cluster
```
kubectl apply -f datadogagent.yaml -n datadog

kubectl apply -f dddashboard-sample.yaml -n ddassets

kubectl apply -f ddmonitor-sample.yaml -n ddassets
```

# Validate the CRDs
```
jonlim-operator-cluster 👾 kubectl get datadogagent -n datadog

NAME      AGENT             CLUSTER-AGENT     CLUSTER-CHECKS-RUNNER   AGE
datadog   Running (9/9/9)   Running (1/1/1)                           2d14h

jonlim-operator-cluster 👾 kubectl get datadogmonitor,datadogdashboard -n ddassets
                                                                                                                                                                               1 ↵
NAME                                           ID          MONITOR STATE   LAST STATE TRANSITION   LAST STATE SYNC        SYNC STATUS   AGE
datadogmonitor.datadoghq.com/pods-restarting   179686202   Alert           2025-08-04T01:45:10Z    2025-08-04T01:49:11Z                 2d14h

NAME                                               ID            SYNC STATUS   AGE
datadogdashboard.datadoghq.com/example-dashboard   z62-58b-vth   OK            42h
```

# Validate in Datadog UI