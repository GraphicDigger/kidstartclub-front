export default function (plop) {


    //  after creating, you need to register the reducer in the store and add the database to shared/providers/data
    plop.setGenerator('Entity_ts', {
        description: 'this is a skeleton plopfile',
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Entity name: ",
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/index.ts',
                templateFile: 'genesis/entity/index.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/types.ts',
                templateFile: 'genesis/entity/types.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/ui/{{titleCase name}}ListItem.jsx',
                templateFile: 'genesis/entity/ui/ComponentListItem.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/api/{{snakeCase name}}.data.ts',
                templateFile: 'genesis/entity/api/entity.data.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/api/{{snakeCase name}}.api.ts',
                templateFile: 'genesis/entity/api/entity.api.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/index.ts',
                templateFile: 'genesis/entity/model/index.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/factory.ts',
                templateFile: 'genesis/entity/model/store/factory.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/slice.ts',
                templateFile: 'genesis/entity/model/store/slice.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/sliceUI.ts',
                templateFile: 'genesis/entity/model/store/sliceUI.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/index.ts',
                templateFile: 'genesis/entity/model/store/index.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/selectors/index.ts',
                templateFile: 'genesis/entity/model/store/selectors/index.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/selectors/base.ts',
                templateFile: 'genesis/entity/model/store/selectors/base.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/selectors/list.ts',
                templateFile: 'genesis/entity/model/store/selectors/list.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/selectors/item.ts',
                templateFile: 'genesis/entity/model/store/selectors/item.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/store/selectors/derived.ts',
                templateFile: 'genesis/entity/model/store/selectors/derived.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/hooks/index.ts',
                templateFile: 'genesis/entity/model/hooks/index.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/hooks/use{{titleCase name}}Selectors.ts',
                templateFile: 'genesis/entity/model/hooks/useEntitySelectors.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/hooks/use{{titleCase name}}Mutation.ts',
                templateFile: 'genesis/entity/model/hooks/useEntityMutation.hbs'
            },
            {
                type: 'add',
                path: 'src/entities/{{snakeCase name}}/model/hooks/useUIStates.ts',
                templateFile: 'genesis/entity/model/hooks/useEntityUIStates.hbs'
            },
        ]
    });

    // plop.setGenerator('Component', {
    //     description: 'this is a skeleton plopfile',
    //     prompts: [
    //         {
    //             type: "input",
    //             name: "name",
    //             message: "Component name: ",
    //         },
    //     ],
    //     actions: [
    //         {
    //             type: 'add',
    //             path: 'src/shared/uiKit/{{titleCase name}}/index.ts',
    //             templateFile: 'genesis/component/index.hbs'
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/shared/uiKit/{{titleCase name}}/{{titleCase name}}.tsx',
    //             templateFile: 'genesis/component/Component.hbs'
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/shared/uiKit/{{titleCase name}}/{{titleCase name}}.stories.tsx',
    //             templateFile: 'genesis/component/Component.stories.hbs'
    //         },
    //     ]
    // });

    plop.setHelper("titleCase", (str) => {
        const words = str.split(/(?=[A-Z])|[\s_-]/);
        return words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    });

    plop.setHelper("snakeCase", (str) => {
        return str
            .replace(/\W+/g, " ")
            .split(/ |\B(?=[A-Z])/)
            .map((word, index) => {
                const lowered = word.toLowerCase();
                return index === 0 ? lowered : lowered.charAt(0).toUpperCase() + lowered.slice(1);
            })
            .join("");
    });
};