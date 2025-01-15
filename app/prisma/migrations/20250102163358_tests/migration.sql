/*
  Warnings:

  - Changed the type of `ssh_tunnel_process_id` on the `ssh_config` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ssh_config" DROP COLUMN "ssh_tunnel_process_id",
ADD COLUMN     "ssh_tunnel_process_id" INTEGER NOT NULL;
