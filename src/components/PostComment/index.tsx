import { Avatar } from '@components/Avatar';
import styles from './styles.module.css';
import stylesDialog from './dialog.module.css';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ThumbsUp, Trash } from 'phosphor-react';
import { FormEvent, useContext, useState } from 'react';
import { Dialog } from '@components/Dialog';
import { getDateUtcFormat } from '@utils/date-utc-format';
import { UserContext } from '@contexts/user-context';
import { useRemoveCommentMutation } from '@hooks/comments/use-comment-remove-mutation ';
import {
  LikesComment,
  useLikesCommentQuery
} from '@hooks/comment likes/use-likes-comment-query';
import { useRemoveLikeComment } from '@hooks/comment likes/use-likes-comment-delete-mutation';
import { useAddLikeComment } from '@hooks/comment likes/use-likes-comment-save-mutation';

type PostComment = {
  id: string;
  avatarUrl: string;
  publishedAt: Date;
  author: string;
  comment: string;
};
export function PostComment({
  id,
  avatarUrl,
  publishedAt,
  author,
  comment
}: PostComment) {
  const { user } = useContext(UserContext);

  const { mutate: removeCommentMutation } = useRemoveCommentMutation();
  const { mutate: removeLikesCommentMutation } = useRemoveLikeComment();
  const { mutate: addLikesCommentMutation } = useAddLikeComment();
  const { data } = useLikesCommentQuery(id);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const numberOfLikes = data?.length;
  const dataHoraUtc = getDateUtcFormat(publishedAt);

  const actionLikesComment = {
    removeLikeComment(likeCommentId: string) {
      removeLikesCommentMutation(likeCommentId);
    },
    addLikeComment() {
      addLikesCommentMutation({ userId: user.id, commentId: id });
    }
  };

  const isUserLikeComment = (): LikesComment | undefined => {
    const usersLikedComment = data?.filter((LikesComment) => {
      if (LikesComment.userId === user.id) {
        return LikesComment;
      }
    });

    return usersLikedComment ? usersLikedComment[0] : undefined;
  };

  const handleAddAndRemoveLike = () => {
    const userLikedComment = isUserLikeComment();
    if (userLikedComment) {
      const actionRemoveLikeComment = actionLikesComment['removeLikeComment'];
      actionRemoveLikeComment(userLikedComment.id);
    } else {
      const addLikeComment = actionLikesComment['addLikeComment'];
      addLikeComment();
    }
  };
  const publishedDateRelativeToNow = formatDistanceToNow(dataHoraUtc, {
    locale: ptBR,
    addSuffix: true
  });

  const publishedDateFormatted = format(
    dataHoraUtc,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR
    }
  );
  const handleRemoveComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    removeCommentMutation({ id });
  };

  return (
    <div className={styles.container}>
      <Dialog isOpen={isOpenModal}>
        <form onSubmit={handleRemoveComment} className={stylesDialog.content}>
          <strong>Excluir Comentário?</strong>
          <span>Você tem certeza que gostaria de excluir este comentário?</span>
          <div className={stylesDialog.actions}>
            <button
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              Cancelar
            </button>
            <button>Sim, excluir</button>
          </div>
        </form>
      </Dialog>
      <header>
        <Avatar avatarUrl={avatarUrl} isBorder={false} />
        <div className={styles.comment}>
          <div className={styles.author_information}>
            <strong>
              {author}
              {author && author === user.name && ' (Voce)'}
            </strong>
            <time
              dateTime={new Date(publishedAt).toISOString()}
              title={publishedDateFormatted}
            >
              {publishedDateRelativeToNow}
            </time>
            <button onClick={() => setIsOpenModal(!isOpenModal)}>
              <Trash />
            </button>
          </div>
          <p>{comment}</p>
        </div>
      </header>

      <footer>
        <button
          className={isUserLikeComment() ? styles.isLiked : ''}
          onClick={() => {
            handleAddAndRemoveLike();
          }}
        >
          <ThumbsUp />
          Aplaudir
          <span>{numberOfLikes}</span>
        </button>
      </footer>
    </div>
  );
}
