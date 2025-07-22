export type UserType = {
  name: string;
  id: string;
  availability: AvailabilityType;
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

export type AvailabilityType = ("WEEKDAYS" | "WEEKENDS" | "EVENINGS")[];
