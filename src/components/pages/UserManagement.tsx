import { Wrap, WrapItem, Spinner, Center } from "@chakra-ui/react";
import { VFC, memo, useEffect, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

import { UserCard } from "../organisms/layout/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSelectUser } from "../../hooks/useSelectUser";
import { UserDetailModal } from "../organisms/layout/user/UserDetailModal";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  useEffect(() => getUsers(), []);
  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
      onOpen();
    },
    [users, onSelectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        user={selectedUser}
        isOpen={isOpen}
        onClose={onClose}
        isAdmin={loginUser?.isAdmin}
      />
    </>
  );
});
