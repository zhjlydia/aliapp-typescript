Component({
  props: {
    onAuthSuccess: () => {},
  },

  methods: {
    auth() {
      this.props.onAuthSuccess()
    },
  },
});
