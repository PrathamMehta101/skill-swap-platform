export type UserType = {
  name: string;
  id: string;
  skillsOffered: {
    name: string;
    id: string;
  }[];
};

export type SwapType = {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  createdAt: Date;
  sender: {
    id: string;
    name: string;
    email: string;
  };
};
