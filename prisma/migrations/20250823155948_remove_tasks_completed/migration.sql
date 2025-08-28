/*
  Warnings:

  - You are about to drop the column `tasksCompleted` on the `ProjectMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Invite" DROP CONSTRAINT "Invite_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."ProjectMember" DROP COLUMN "tasksCompleted";

-- AddForeignKey
ALTER TABLE "public"."Invite" ADD CONSTRAINT "Invite_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
