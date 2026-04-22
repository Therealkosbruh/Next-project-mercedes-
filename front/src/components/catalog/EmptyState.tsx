import type { ReactNode } from "react";
import styles from "@/styles/components/catalog.module.scss";

interface Action {
  label: string;
  onClick: () => void;
}

interface Props {
  icon: ReactNode;
  title: string;
  message: string;
  action?: Action;
}

export default function EmptyState({ icon, title, message, action }: Props) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <h2 className={styles.emptyTitle}>{title}</h2>
      <p className={styles.emptyBody}>{message}</p>
      {action && (
        <button className={styles.btnGhost} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
