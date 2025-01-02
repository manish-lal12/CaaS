from pydantic import BaseModel
from typing import Literal


########################################## Container ###############################################
class ContainerData(BaseModel):
    container_name: str
    image: str
    tag: str
    network: str
    storage: str
    user_id: str


class ContainerReturnData(BaseModel):
    container_ip: str
    return_code: int


class ContainerActions(BaseModel):
    container_name: str
    action: Literal["start", "stop", "restart"]


class ContainerActionsReturnData(BaseModel):
    return_code: int


class DeleteContainerData(BaseModel):
    container_name: str


class DeleteContainerReturnData(BaseModel):
    return_code: int


########################################## Docker Network ##########################################
class DockerNetworkData(BaseModel):
    network_name: str
    network_subnet: str
    network_gateway: str


class DockerNetworkReturnData(BaseModel):
    return_code: int


########################################## Nginx Config ############################################
class CreateNginxConfigData(BaseModel):
    config_name: str
    domain_name: str
    protocol: str
    ip: str
    port: int
    container_name: str


class CreateNginxConfigReturnData(BaseModel):
    return_code: int


class DeleteNginxConfigData(BaseModel):
    config_name: str
    container_name: str


class DeleteNginxConfigReturnData(BaseModel):
    return_code: int


########################################## SSH ############################################
class CreateSSHTunnelData(BaseModel):
    ssh_proxy_port: int
    container_ip: str
    node_name: str


class CreateSSHTunnelReturnData(BaseModel):
    return_code: int
    ssh_tunnel_pid: int


class DeleteSSHTunnelData(BaseModel):
    ssh_tunnel_pid: int


class DeleteSSHTunnelReturnData(BaseModel):
    return_code: int


class AuthorizedKeysData(BaseModel):
    user_id: str
    ssh_public_key: str
    container_name: str


class AuthorizedKeysReturnData(BaseModel):
    return_code: int


class DeleteAuthorizedKeysData(BaseModel):
    user_id: str
    container_name: str


class DeleteAuthorizedKeysReturnData(BaseModel):
    return_code: int


class SSHKeyGenReturnData(BaseModel):
    private_key: str
    public_key: str


########################################## user ############################################


class InitUserData(BaseModel):
    user_id: str


class InitUserReturnData(BaseModel):
    return_code: int
