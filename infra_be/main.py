from ansible_runner import run, Runner


# Create nginx config #############################################
create_nginx_config_data = {
    "config_name": "UUID-87878uhjh",
    "domain_name": "example.com",
    "protocol": "http",
    "ip": "11.0.0.2",
    "port": 80,
    "container_name": "hell",
}
create_nginx_config_res: Runner = run(
    private_data_dir=".",
    playbook="create_nginx_config.yaml",
    extravars=create_nginx_config_data,
)
print(create_nginx_config_res.rc)


# create docker network #############################################
create_docker_network_data = {
    "network_name": "UUID",
    "network_subnet": "15.0.0.0/24",
    "network_gateway": "15.0.0.1",
}
create_docker_network_res: Runner = run(
    private_data_dir=".",
    playbook="create_docker_network.yaml",
    extravars=create_docker_network_data,
)
print(create_docker_network_res.rc)


# create docker container #############################################
create_container_data = {
    "container_name": "nginx",
    "image": "nginx",
    "tag": "alpine3.20",
    "network": "loc",
    "storage": "3G",
}
create_container_res: Runner = run(
    private_data_dir=".",
    playbook="create_container.yaml",
    extravars=create_container_data,
)
container_ip = None
for event in create_container_res.events:
    try:
        container_ip = event["event_data"]["res"]["container"]["NetworkSettings"][
            "Networks"
        ]["loc"]["IPAddress"]
    except:
        # print("IPNotFound")
        pass
print(container_ip)
