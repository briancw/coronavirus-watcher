export default {
    methods: {
        nl2br(input) {
            if (input) {
                return input.replace(/(?:\r\n|\r|\n)/g, '<br />')
            }
        },
    },
}
