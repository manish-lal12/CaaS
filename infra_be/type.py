from pydantic import BaseModel
from typing import Literal


class ContainerData(BaseModel):
    container_name: str
    image: str
    tag: str
    network: str
    storage: str
    state: Literal["absent", "started", "stopped"]


class ContainerReturnData(BaseModel):
    container_ip: str


class CreateNginxConfigData(BaseModel):
    config_name: str
    domain_name: str
    protocol: str
    ip: str
    port: int
    container_name: str


class CreateNginxConfigReturnData(BaseModel):
    return_code: int


class DockerNetworkData(BaseModel):
    network_name: str
    network_subnet: str
    network_gateway: str
    state: str


class DockerNetworkReturnData(BaseModel):
    return_code: int


class DeleteNginxConfigData(BaseModel):
    config_name: str
    container_name: str


class DeleteNginxConfigReturnData(BaseModel):
    return_code: int
