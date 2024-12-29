from ansible_runner import Runner, run_async
from type import (
    DockerNetworkData,
    DockerNetworkReturnData,
    CreateNginxConfigData,
    ContainerData,
    ContainerReturnData,
    CreateNginxConfigReturnData,
    DeleteNginxConfigData,
    DeleteNginxConfigReturnData,
    ContainerActions,
    ContainerActionsReturnData,
)
import threading
from typing import Tuple
import asyncio


########################################## Docker Network ##########################################
async def CreateDockerNetwork(
    CreateNetworkData: DockerNetworkData,
) -> DockerNetworkReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="docker_network/create_network.yaml",
        extravars=CreateNetworkData.model_dump(),  # model_dump is converting to dict
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = DockerNetworkReturnData(return_code=res.rc)
    return ReturnData


async def DeleteDockerNetwork(
    DeleteNetworkData: DockerNetworkData,
) -> DockerNetworkReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="docker_network/delete_network.yaml",
        extravars=DeleteNetworkData.model_dump(),  # model_dump is converting to dict
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = DockerNetworkReturnData(return_code=res.rc)
    return ReturnData


########################################## Nginx Config ############################################
async def CreateNginxConfig(
    NginxConfigData: CreateNginxConfigData,
) -> CreateNginxConfigReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="nginx/create_config.yaml",
        extravars=NginxConfigData.model_dump(),  # model_dump is converting to dict
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = CreateNginxConfigReturnData(return_code=res.rc)
    return ReturnData


async def DeleteNginxConfig(
    ConfigData: DeleteNginxConfigData,
) -> DeleteNginxConfigReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="nginx/delete_config.yaml",
        extravars=ConfigData.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    return DeleteNginxConfigReturnData(return_code=res.rc)


########################################## Container ###############################################
async def CreateContainer(ContainerData: ContainerData) -> ContainerReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="container/create_container.yaml",
        extravars=ContainerData.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    container_ip = ""
    for event in res.events:
        try:
            container_ip = event["event_data"]["res"]["container"]["NetworkSettings"][
                "Networks"
            ][ContainerData.network]["IPAddress"]
        except:
            pass
    ReturnData = ContainerReturnData(container_ip=container_ip, return_code=res.rc)
    return ReturnData


async def DeleteContainer(ContainerData: ContainerData) -> ContainerReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="container/delete_container.yaml",
        extravars=ContainerData.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = ContainerReturnData(container_ip="None", return_code=res.rc)
    return ReturnData


async def ActionsContainer(data: ContainerActions) -> ContainerActionsReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="container/container_actions.yaml",
        extravars=data.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = ContainerActionsReturnData(return_code=res.rc)
    return ReturnData
