from InfrastructureFunctions import (
    CreateContainer,
    DeleteContainer,
    CreateDockerNetwork,
    DeleteDockerNetwork,
    CreateNginxConfig,
    DeleteNginxConfig,
    ActionsContainer,
)
from type import (
    ContainerData,
    DockerNetworkData,
    CreateNginxConfigData,
    DeleteNginxConfigData,
    ContainerReturnData,
    CreateNginxConfigReturnData,
    DeleteNginxConfigReturnData,
    DockerNetworkReturnData,
    ContainerActions,
    ContainerActionsReturnData,
)


from fastapi import FastAPI

app = FastAPI()


@app.post("/container")
async def create_container(container: ContainerData) -> ContainerReturnData:
    return await CreateContainer(container)


@app.post("/container_actions")
async def ContainerActions(data: ContainerActions) -> ContainerActionsReturnData:
    return await ActionsContainer(data)


@app.delete("/container")
async def delete_container(container: ContainerData) -> ContainerReturnData:
    return await DeleteContainer(container)


@app.post("/network")
async def create_network(network: DockerNetworkData) -> DockerNetworkReturnData:
    return await CreateDockerNetwork(network)


@app.delete("/network")
async def delete_network(network: DockerNetworkData) -> DockerNetworkReturnData:
    return await DeleteDockerNetwork(network)


@app.post("/nginx")
async def create_nginx_config(
    nginx: CreateNginxConfigData,
) -> CreateNginxConfigReturnData:
    return await CreateNginxConfig(nginx)


@app.delete("/nginx")
async def delete_nginx_config(
    nginx: DeleteNginxConfigData,
) -> DeleteNginxConfigReturnData:
    return await DeleteNginxConfig(nginx)
