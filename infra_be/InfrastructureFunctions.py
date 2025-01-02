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
    CreateSSHTunnelData,
    CreateSSHTunnelReturnData,
    DeleteSSHTunnelData,
    DeleteSSHTunnelReturnData,
    AuthorizedKeysData,
    AuthorizedKeysReturnData,
    InitUserData,
    InitUserReturnData,
    DeleteAuthorizedKeysData,
    DeleteAuthorizedKeysReturnData,
    DeleteContainerData,
    DeleteContainerReturnData,
    EditNginxConfigData,
    EditNginxConfigReturnData,
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


async def EditNginxConfig(
    NginxConfigData: EditNginxConfigData,
) -> EditNginxConfigReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="nginx/edit_config.yaml",
        extravars=NginxConfigData.model_dump(),  # model_dump is converting to dict
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = EditNginxConfigReturnData(return_code=res.rc)
    return ReturnData


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


async def DeleteContainer(
    ContainerData: DeleteContainerData,
) -> DeleteContainerReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="container/delete_container.yaml",
        extravars=ContainerData.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = DeleteContainerReturnData(return_code=res.rc)
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


########################################## SSH ###############################################
async def CreateSSHTunnel(data: CreateSSHTunnelData) -> CreateSSHTunnelReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="ssh/start_ssh_tunnel.yaml",
        extravars=data.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    tunnel_pid = ""
    for event in res.events:
        try:
            tunnel_pid = event["event_data"]["res"]["stdout"]
        except:
            pass
    ReturnData = CreateSSHTunnelReturnData(
        return_code=res.rc, ssh_tunnel_pid=tunnel_pid
    )
    return ReturnData


async def DeleteSSHTunnel(data: DeleteSSHTunnelData) -> DeleteSSHTunnelReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="ssh/stop_ssh_tunnel.yaml",
        extravars=data.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = DeleteSSHTunnelReturnData(return_code=res.rc)
    return ReturnData


async def CreateSSHAuthorizedKeysFile(
    data: AuthorizedKeysData,
) -> AuthorizedKeysReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="ssh/create_ssh_authorized_key_file.yaml",
        extravars=data.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = AuthorizedKeysReturnData(return_code=res.rc)
    return ReturnData


async def DeleteSSHAuthorizedKeysFile(
    data: DeleteAuthorizedKeysData,
) -> DeleteAuthorizedKeysReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="ssh/delete_ssh_authorized_key_file.yaml",
        extravars=data.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = DeleteAuthorizedKeysReturnData(return_code=res.rc)
    return ReturnData


########################################## user ###############################################


async def InitUser(
    data: InitUserData,
) -> InitUserReturnData:
    res_async: Tuple[threading.Thread, Runner] = run_async(
        private_data_dir=".",
        playbook="init_user.yaml",
        extravars=data.model_dump(),
    )
    res = res_async[1]
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, res_async[0].join)
    ReturnData = InitUserReturnData(return_code=res.rc)
    return ReturnData
