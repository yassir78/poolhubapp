package poolhub.web.rest.exceptions;

public class OptimisticFailureLockException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public OptimisticFailureLockException() {
        super(
            ErrorConstants.OPTIMISTIC_LOCKING_FAILURE,
            "Cannot access this resource at the same time",
            "userManagement",
            "optimisticLockingFailure"
        );
    }
}
