- This assumes you already have a working kubernetes cluster

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