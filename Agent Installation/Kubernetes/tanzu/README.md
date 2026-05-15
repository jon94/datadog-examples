https://docs.datadoghq.com/containers/kubernetes/installation/?tab=helm#installation

## values.yaml

- Feel free to use the values.yaml file that is provided in the repo.

### Creating Datadog API Key and APP Key as Kubernetes Secret
```
kubectl create namespace datadog
kubectl create secret generic datadog-secret -n datadog --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
```