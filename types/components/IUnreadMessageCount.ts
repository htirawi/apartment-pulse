import { Session } from 'next-auth';

export interface IUnreadMessageCountProps {
  session: Session | null;
}
