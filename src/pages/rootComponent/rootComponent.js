export class RootComponent {

  configureRouter(config, router) {
    config.title = 'Transwarp Portal';
    config.map([
      { route: ["/", "/login"], name: "login", moduleId: "../login/login", nav: true, title: "登录"},
      { route: ["/portal"], name: "portal", moduleId: "../portal/portal", nav: false}
    ]);

    this.router = router;
  }
}
