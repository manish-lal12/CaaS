from ansible_runner import run, Runner
from type import (
    DockerNetworkData,
    DockerNetworkReturnData,
    CreateNginxConfigData,
    ContainerData,
    ContainerReturnData,
    CreateNginxConfigReturnData,
    DeleteNginxConfigData,
    DeleteNginxConfigReturnData,
)


def CreateDockerNetwork(
    CreateNetworkData: DockerNetworkData,
) -> DockerNetworkReturnData:
    res: Runner = run(
        private_data_dir=".",
        playbook="create_docker_network.yaml",
        extravars=CreateNetworkData.model_dump(),  # model_dump is converting to dict
    )
    ReturnData = DockerNetworkReturnData(return_code=res.rc)
    return ReturnData


def CreateNginxConfig(
    NginxConfigData: CreateNginxConfigData,
) -> CreateNginxConfigReturnData:
    res: Runner = run(
        private_data_dir=".",
        playbook="create_nginx_config.yaml",
        extravars=NginxConfigData.model_dump(),  # model_dump is converting to dict
    )
    ReturnData = CreateNginxConfigReturnData(return_code=res.rc)
    return ReturnData


def Container(ContainerData: ContainerData) -> ContainerReturnData:
    res: Runner = run(
        private_data_dir=".",
        playbook="container.yaml",
        extravars=ContainerData.model_dump(),
    )
    container_ip = ""
    for event in res.events:
        try:
            container_ip = event["event_data"]["res"]["container"]["NetworkSettings"][
                "Networks"
            ]["loc"]["IPAddress"]
        except:
            # print("IPNotFound")
            pass
    ReturnData = ContainerReturnData(container_ip=container_ip)
    return ReturnData


def DeleteNginxConfig(ConfigData: DeleteNginxConfigData) -> DeleteNginxConfigReturnData:
    res: Runner = run(
        private_data_dir=".",
        playbook="delete_nginx_config.yaml",
        extravars=ConfigData.model_dump(),
    )
    return DeleteNginxConfigReturnData(return_code=res.rc)
