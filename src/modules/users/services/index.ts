"use server";

import { prisma } from "@/lib/prisma";

export const GetUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};



export const deleteUser = async (userId: string) => {
  const result = await prisma.user.delete({ where: { id: userId } });
  return result;
};

export const changeRoleToAdmin = async (userId: string) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: { role: "admin" },
  });
  return result;
};

export const changeRoleToMember = async (userId: string) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: { role: "member" },
  });
  return result;
};