export default {
    transform: {},
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.js', '.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
};

