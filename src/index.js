import { createSelectorCreator } from 'reselect';
import { changeMemoize } from 'reselect-change-memoize';
import { arrayMemoize, objectMemoize, listMemoize, mapMemoize } from 'reselect-map'

export function createArraySelectorWithChangeCallback(callback, ...args) {
    return createSelectorCreator(changeMemoize, callback, arrayMemoize)(...args);
}

export function createObjectSelectorWithChangeCallback(callback, ...args) {
    return createSelectorCreator(changeMemoize, callback, objectMemoize)(...args);
}

export function createListSelectorWithChangeCallback(callback, ...args) {
    return createSelectorCreator(changeMemoize, callback, listMemoize)(...args);
}

export function createMapSelectorWithChangeCallback(callback, ...args) {
    return createSelectorCreator(changeMemoize, callback, mapMemoize)(...args);
}

function logNamedChange(name) {
    let logName = name || 'unknown';
    logName = `- ${logName}`;

    return (lastArgs, lastResult, newArgs, newResult) => {
        // eslint-disable-next-line no-console
        console.log(
            logName,
            '\n\tlastArgs:', lastArgs,
            '\n\tlastResult:', lastResult,
            '\n\tnewArgs:', newArgs,
            '\n\tnewResult:', newResult
        );
    };
}

function createSelector(args, creatorFunc) {
    let name;
    if (typeof(args[0]) === 'string') {
        name = args.shift();
    }

    let changeCallback;
    if (process.env.NODE_ENV !== 'production') {
        changeCallback = logNamedChange(name);
    }
    return creatorFunc(changeCallback, ...args);
}

export const createArraySelector = (...args) => createSelector(args, createArraySelectorWithChangeCallback);
export const createObjectSelector = (...args) => createSelector(args, createObjectSelectorWithChangeCallback);
export const createListSelector = (...args) => createSelector(args, createListSelectorWithChangeCallback);
export const createMapSelector = (...args) => createSelector(args, createMapSelectorWithChangeCallback);

