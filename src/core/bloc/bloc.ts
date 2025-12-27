export type StateObserver<S> = (state: S) => void;

/**
 * Base class for Business Logic Components (BLoC)
 */
export abstract class Bloc<E, S> {
  private _state: S;
  private observers: Set<StateObserver<S>> = new Set();

  constructor(initialState: S) {
    this._state = initialState;
  }

  /**
   * Get the current state
   */
  get state(): S {
    return this._state;
  }

  /**
   * Dispatch an event to the BLoC
   */
  abstract onEvent(event: E): void;

  /**
   * Update the current state and notify observers
   */
  protected emit(newState: S): void {
    this._state = newState;
    this.observers.forEach((observer) => observer(this._state));
  }

  /**
   * Subscribe to state changes
   */
  subscribe(observer: StateObserver<S>): () => void {
    this.observers.add(observer);
    // Initial notification
    observer(this._state);

    return () => {
      this.observers.delete(observer);
    };
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.observers.clear();
  }
}
