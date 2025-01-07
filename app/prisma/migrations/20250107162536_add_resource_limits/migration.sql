/*
  Warnings:

  - A unique constraint covering the columns `[resources_limitId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resources_limitId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resources_limitId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "resources_limit" (
    "id" TEXT NOT NULL,
    "vpc_limit" INTEGER NOT NULL DEFAULT 2,
    "container_limit" INTEGER NOT NULL DEFAULT 2,
    "ssh_key_limit" INTEGER NOT NULL DEFAULT 2,
    "inbound_rule_limit" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "resources_limit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_resources_limitId_key" ON "User"("resources_limitId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_resources_limitId_fkey" FOREIGN KEY ("resources_limitId") REFERENCES "resources_limit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
