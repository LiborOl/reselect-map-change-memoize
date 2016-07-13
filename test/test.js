import expect from 'expect';
import Immutable from 'immutable'
import { createSelector } from 'reselect-change-memoize'

import {
    createArraySelectorWithChangeCallback, createObjectSelectorWithChangeCallback, createListSelectorWithChangeCallback, createMapSelectorWithChangeCallback,
    createArraySelector, createObjectSelector, createListSelector, createMapSelector
} from '../src/index'


describe('createArraySelectorWithChangeCallback', function () {
    it('Code for README', () => {
        // eslint-disable-next-line no-unused-vars
        function myCallback(lastArgs, lastResult, newArgs, newResult) {
            // Your code
        }

        const selector = createArraySelectorWithChangeCallback(
            myCallback,
            (state) => state.arrayState,
            (state) => state.id,
            (arrayState, id) => { // eslint-disable-line arrow-body-style
                return {arrayState, id};
            }
        );

        selector({arrayState: [1, 2, 3], initial: 'state'});
    });

    it('Should callback when a value changes', () => {
        let calls = 0;
        const selector = createArraySelectorWithChangeCallback(
            () => {
                calls += 1
            },
            (state) => state.arrayState,
            (state) => state.id,
            (arrayState, id) => { // eslint-disable-line arrow-body-style
                return {arrayState, id};
            }
        );

        const ai1 = {};
        const ai2 = {};
        const ai3 = {};

        let state, ret, oldRet;

        //the initial call
        state = {arrayState: []};
        ret = selector(state);
        expect(calls).toBe(1);
        expect(ret).toEqual([]);

        //nothing has changed
        state = {arrayState: state.arrayState};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(1);
        expect(oldRet).toBe(ret);

        //id was changed
        state = {arrayState: state.arrayState, id: 'id'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(2);
        expect(oldRet).toNotBe(ret);

        //array were initialized (not empty)
        state = {arrayState: [ai1, ai2], id: 'id'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(3);
        expect(oldRet).toNotBe(ret);
        expect(ret.length).toBe(2);
        expect(ret[0].arrayState).toBe(ai1);
        expect(ret[1].arrayState).toBe(ai2);
        expect(ret[0].id).toBe('id');
        expect(ret[1].id).toBe('id');

        //another array item was added
        state = {arrayState: [ai1, ai3, ai2], id: 'id'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(4);
        expect(oldRet).toNotBe(ret);
        expect(ret.length).toBe(3);
        expect(ret[0]).toBe(oldRet[0]);
        expect(ret[2]).toBe(oldRet[1]);
        expect(ret[1].arrayState).toBe(ai3);
        expect(ret[1].id).toBe('id');

        //id was changed
        state = {arrayState: [ai1, ai3, ai2], id: 'id2'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(5);
        expect(oldRet).toNotBe(ret);
        expect(ret.length).toBe(3);
        expect(ret[0]).toNotBe(oldRet[0]);
        expect(ret[1]).toNotBe(oldRet[1]);
        expect(ret[2]).toNotBe(oldRet[2]);
        expect(ret[0].arrayState).toBe(ai1);
        expect(ret[1].arrayState).toBe(ai3);
        expect(ret[2].arrayState).toBe(ai2);
        expect(ret[0].id).toBe('id2');
        expect(ret[1].id).toBe('id2');
        expect(ret[2].id).toBe('id2');
    });
});

describe('createObjectSelectorWithChangeCallback', function () {
    it('Should callback when a value changes', function () {
        let calls = 0;
        const selector = createObjectSelectorWithChangeCallback(
            () => {
                calls += 1
            },
            state => state.numbers,
            state => state.mul1,
            (element, mul1) => ({val: element * mul1})
        );

        let state, oldRet, ret;

        //initial state
        state = {
            numbers: {a: 1, b: 2},
            mul1: 1
        };
        ret = selector(state);
        expect(calls).toBe(1);
        expect(ret.a.val).toBe(1);
        expect(ret.b.val).toBe(2);

        //nothing has changed
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(1);
        expect(ret).toBe(oldRet);

        //one object property has changed
        state = {
            numbers: {a: 1, b: 3},
            mul1: 1
        };
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(2);
        expect(ret.a).toBe(oldRet.a);
        expect(ret.b).toNotBe(oldRet.b);
        expect(ret.b.val).toBe(3);

        //another argument has changed
        state = {
            numbers: {a: 1, b: 3},
            mul1: 5
        };
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(3);
        expect(ret.a).toNotBe(oldRet.a);
        expect(ret.b).toNotBe(oldRet.b);
        expect(ret.a.val).toBe(5);
        expect(ret.b.val).toBe(15);
    });
});

describe('createListSelectorWithChangeCallback', function () {
    it('Should callback when a value changes', () => {
        let calls = 0;
        const selector = createListSelectorWithChangeCallback(
            () => {
                calls += 1
            },
            (state) => state.arrayState,
            (state) => state.id,
            (arrayState, id) => { // eslint-disable-line arrow-body-style
                return {arrayState, id};
            }
        );

        const ai1 = {};
        const ai2 = {};
        const ai3 = {};

        let state, ret, oldRet;

        //the initial call
        state = {arrayState: []};
        ret = selector(state);
        expect(calls).toBe(1);
        expect(ret).toEqual([]);

        //nothing has changed
        state = {arrayState: state.arrayState};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(1);
        expect(oldRet).toBe(ret);

        //id was changed
        state = {arrayState: state.arrayState, id: 'id'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(2);
        expect(oldRet).toNotBe(ret);

        //array were initialized (not empty)
        state = {arrayState: [ai1, ai2], id: 'id'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(3);
        expect(oldRet).toNotBe(ret);
        expect(ret.length).toBe(2);
        expect(ret[0].arrayState).toBe(ai1);
        expect(ret[1].arrayState).toBe(ai2);
        expect(ret[0].id).toBe('id');
        expect(ret[1].id).toBe('id');

        //another array item was added
        state = {arrayState: [ai1, ai3, ai2], id: 'id'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(4);
        expect(oldRet).toNotBe(ret);
        expect(ret.length).toBe(3);
        expect(ret[0]).toBe(oldRet[0]);
        expect(ret[2]).toBe(oldRet[1]);
        expect(ret[1].arrayState).toBe(ai3);
        expect(ret[1].id).toBe('id');

        //id was changed
        state = {arrayState: [ai1, ai3, ai2], id: 'id2'};
        oldRet = ret;
        ret = selector(state);
        expect(calls).toBe(5);
        expect(oldRet).toNotBe(ret);
        expect(ret.length).toBe(3);
        expect(ret[0]).toNotBe(oldRet[0]);
        expect(ret[1]).toNotBe(oldRet[1]);
        expect(ret[2]).toNotBe(oldRet[2]);
        expect(ret[0].arrayState).toBe(ai1);
        expect(ret[1].arrayState).toBe(ai3);
        expect(ret[2].arrayState).toBe(ai2);
        expect(ret[0].id).toBe('id2');
        expect(ret[1].id).toBe('id2');
        expect(ret[2].id).toBe('id2');
    });
});

describe('createMapSelectorWithChangeCallback', function () {

    it('basic map selector', () => {
        let calls = 0;
        const selector = createMapSelectorWithChangeCallback(
            () => {
                calls += 1
            },
            state => state,
            (element) => element * 5
        );

        let state, ret, oldRet;

        //initial state
        state = Immutable.Map({a: 1, b: 2});
        ret = selector(state);
        expect(Immutable.is(ret, Immutable.Map({a: 5, b: 10}))).toBe(true);
        expect(calls).toBe(1);

        //nothing has changed
        oldRet = ret;
        ret = selector(state);
        expect(ret).toBe(oldRet);
        expect(calls).toBe(1);

        //new state is created with the same properties
        state = Immutable.Map({a: 1, b: 2});
        oldRet = ret;
        ret = selector(state);
        expect(Immutable.is(ret, Immutable.Map({a: 5, b: 10}))).toBe(true);
        expect(calls).toBe(2);

        //properties are modified
        state = Immutable.Map({a: 3, b: 4});
        oldRet = ret;
        ret = selector(state);
        expect(Immutable.is(ret, Immutable.Map({a: 15, b: 20}))).toBe(true);
        expect(calls).toBe(3);
    })
});

describe('createArraySelector', function () {
    it('Code for README', function () {
        const selector1 = createArraySelector(
            'An awesome array selector',
            (state) => state.arrayState,
            (state) => state.id,
            (arrayItem, id) => {
                return {arrayItem, id};
            }
        );
        const selector2 = createSelector(
            'A second awesome selector which uses the first awesome selector',
            selector1,
            (selector1Array) => {
                return {selector2: selector1Array};
            }
        );
        // The name doesn't not have to be provided
        const selector3 = createArraySelector(
            selector1,
            (selector1Item) => {
                return {selector2ArrayItem: selector1Item};
            }
        );

        const state = {arrayState: [1, 2, 3], id: 'id'};
        selector2(state);
        selector1(state);
        selector3(state);
    });
});
