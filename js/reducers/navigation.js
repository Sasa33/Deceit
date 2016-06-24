export default (state = 'podListTab', action) => {
  switch (action.type) {
    case 'SWITCH_TAB':
      return action.tab;
    default:
      return state;
  }
}
