from pydantic import BaseModel
from typing import Literal


########################################## Container ###############################################
class ContainerData(BaseModel):
    container_name: str
    image: str
    tag: str
    network: str
    storage: str


class ContainerReturnData(BaseModel):
    container_ip: str
    return_code: int


class ContainerActions(BaseModel):
    container_name: str
    action: Literal["start", "stop", "restart"]


class ContainerActionsReturnData(BaseModel):
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


########################################## Nginx Config ############################################
class CreateSSHTunnelData(BaseModel):
    ssh_proxy_port: int
    node_internal_ip: str
    node_port: int
    node_name: str


class CreateSSHTunnelReturnData(BaseModel):
    return_code: int
    ssh_tunnel_pid: int


class DeleteSSHTunnelData(BaseModel):
    ssh_tunnel_pid: int


class DeleteSSHTunnelReturnData(BaseModel):
    return_code: int
