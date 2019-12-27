import { Hub } from '@sentry/hub';
import { Span as SpanInterface, SpanContext, SpanStatus } from '@sentry/types';
export declare const TRACEPARENT_REGEXP: RegExp;
/**
 * Keeps track of finished spans for a given transaction
 */
declare class SpanRecorder {
    private readonly _maxlen;
    private _openSpanCount;
    finishedSpans: Span[];
    constructor(maxlen: number);
    /**
     * This is just so that we don't run out of memory while recording a lot
     * of spans. At some point we just stop and flush out the start of the
     * trace tree (i.e.the first n spans with the smallest
     * start_timestamp).
     */
    startSpan(span: Span): void;
    /**
     * Appends a span to finished spans table
     * @param span Span to be added
     */
    finishSpan(span: Span): void;
}
/**
 * Span contains all data about a span
 */
export declare class Span implements SpanInterface, SpanContext {
    /**
     * The reference to the current hub.
     */
    private readonly _hub;
    /**
     * @inheritDoc
     */
    private readonly _traceId;
    /**
     * @inheritDoc
     */
    private readonly _spanId;
    /**
     * @inheritDoc
     */
    private readonly _parentSpanId?;
    /**
     * @inheritDoc
     */
    sampled?: boolean;
    /**
     * Timestamp when the span was created.
     */
    readonly startTimestamp: number;
    /**
     * Finish timestamp of the span.
     */
    timestamp?: number;
    /**
     * @inheritDoc
     */
    transaction?: string;
    /**
     * @inheritDoc
     */
    op?: string;
    /**
     * @inheritDoc
     */
    description?: string;
    /**
     * @inheritDoc
     */
    tags: {
        [key: string]: string;
    };
    /**
     * @inheritDoc
     */
    data: {
        [key: string]: any;
    };
    /**
     * List of spans that were finalized
     */
    spanRecorder?: SpanRecorder;
    constructor(spanContext?: SpanContext, hub?: Hub);
    /**
     * Attaches SpanRecorder to the span itself
     * @param maxlen maximum number of spans that can be recorded
     */
    initFinishedSpans(maxlen?: number): void;
    /**
     * Creates a new `Span` while setting the current `Span.id` as `parentSpanId`.
     * Also the `sampled` decision will be inherited.
     */
    child(spanContext?: Pick<SpanContext, Exclude<keyof SpanContext, 'spanId'>>): Span;
    /**
     * Continues a trace from a string (usually the header).
     * @param traceparent Traceparent string
     */
    static fromTraceparent(traceparent: string, spanContext?: Pick<SpanContext, Exclude<keyof SpanContext, 'spanId' | 'sampled' | 'traceid'>>): Span | undefined;
    /**
     * @inheritDoc
     */
    setTag(key: string, value: string): this;
    /**
     * @inheritDoc
     */
    setData(key: string, value: any): this;
    /**
     * @inheritDoc
     */
    setStatus(value: SpanStatus): this;
    /**
     * @inheritDoc
     */
    setHttpStatus(httpStatus: number): this;
    /**
     * @inheritDoc
     */
    isSuccess(): boolean;
    /**
     * Sets the finish timestamp on the current span
     */
    finish(useLastSpanTimestamp?: boolean): string | undefined;
    /**
     * @inheritDoc
     */
    toTraceparent(): string;
    /**
     * @inheritDoc
     */
    getTraceContext(): object;
    /**
     * @inheritDoc
     */
    toJSON(): object;
}
export {};
//# sourceMappingURL=span.d.ts.map