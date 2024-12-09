import Session from "@/types/session";

export const defaultUser: Session = {
  id: "guest-id",
  name: "Visitante",
  photo: "https://api.dicebear.com/9.x/initials/png?seed=Visitante",
  email: "guest@guest.guest",
  isGuest: true,
};
