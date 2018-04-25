module.exports = function (rl) {
    return {
        showOptions: showOptions,
        readSelectedCommand: readSelectedCommand
    };

    function showOptions(type) {
        console.log('');
        console.log('=== ' + type + ' Management ===');
        console.log('1. Create ' + type);
        console.log('2. Delete ' + type);
        console.log('3. List ' + type + 's');
        console.log('4. Back');
    }

    function readSelectedCommand(onSelectionCallback) {
        rl.question("Choose the action by number:", function (selectedActionNumber) {
            onSelectionCallback(selectedActionNumber);
        });
    }
};