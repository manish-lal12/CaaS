-- CreateEnum
CREATE TYPE "CONTAINER_STATE" AS ENUM ('STARTED', 'STOPPED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "welcomed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateTable
CREATE TABLE "vpc" (
    "id" TEXT NOT NULL,
    "vpc_name" TEXT NOT NULL,
    "node" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "cidr" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "available_vpcId" TEXT NOT NULL,

    CONSTRAINT "vpc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "containers" (
    "name" TEXT NOT NULL,
    "nick_name" TEXT,
    "node" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "state" "CONTAINER_STATE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vpcId" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ssh_config_id" TEXT NOT NULL,
    "ssh_keysId" TEXT NOT NULL,

    CONSTRAINT "containers_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "inbound_rules" (
    "id" TEXT NOT NULL,
    "node" TEXT NOT NULL,
    "rule_name" TEXT NOT NULL,
    "domain_name" TEXT NOT NULL,
    "service_protocol" TEXT NOT NULL,
    "container_ip" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "containersName" TEXT NOT NULL,
    "cloudflare_zone" TEXT NOT NULL,
    "cloudflare_record_id" TEXT NOT NULL,

    CONSTRAINT "inbound_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_vpc" (
    "id" TEXT NOT NULL,
    "node" TEXT NOT NULL,
    "cidr" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL,

    CONSTRAINT "available_vpc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ssh_config" (
    "id" TEXT NOT NULL,
    "ssh_proxy_node_name" TEXT NOT NULL,
    "ssh_proxy_port" INTEGER NOT NULL,
    "ssh_tunnel_process_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "available_ssh_proxy_portsId" TEXT NOT NULL,

    CONSTRAINT "ssh_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available_ssh_proxy_ports" (
    "id" TEXT NOT NULL,
    "ssh_proxy_node_name" TEXT NOT NULL,
    "ssh_proxy_port" INTEGER NOT NULL,
    "used" BOOLEAN NOT NULL,

    CONSTRAINT "available_ssh_proxy_ports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ssh_keys" (
    "id" TEXT NOT NULL,
    "nick_name" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "private_key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ssh_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "vpc_available_vpcId_key" ON "vpc"("available_vpcId");

-- CreateIndex
CREATE UNIQUE INDEX "containers_ssh_config_id_key" ON "containers"("ssh_config_id");

-- CreateIndex
CREATE UNIQUE INDEX "inbound_rules_domain_name_key" ON "inbound_rules"("domain_name");

-- CreateIndex
CREATE UNIQUE INDEX "ssh_config_available_ssh_proxy_portsId_key" ON "ssh_config"("available_ssh_proxy_portsId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vpc" ADD CONSTRAINT "vpc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vpc" ADD CONSTRAINT "vpc_available_vpcId_fkey" FOREIGN KEY ("available_vpcId") REFERENCES "available_vpc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "containers" ADD CONSTRAINT "containers_vpcId_fkey" FOREIGN KEY ("vpcId") REFERENCES "vpc"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "containers" ADD CONSTRAINT "containers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "containers" ADD CONSTRAINT "containers_ssh_config_id_fkey" FOREIGN KEY ("ssh_config_id") REFERENCES "ssh_config"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "containers" ADD CONSTRAINT "containers_ssh_keysId_fkey" FOREIGN KEY ("ssh_keysId") REFERENCES "ssh_keys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbound_rules" ADD CONSTRAINT "inbound_rules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbound_rules" ADD CONSTRAINT "inbound_rules_containersName_fkey" FOREIGN KEY ("containersName") REFERENCES "containers"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ssh_config" ADD CONSTRAINT "ssh_config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ssh_config" ADD CONSTRAINT "ssh_config_available_ssh_proxy_portsId_fkey" FOREIGN KEY ("available_ssh_proxy_portsId") REFERENCES "available_ssh_proxy_ports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ssh_keys" ADD CONSTRAINT "ssh_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
