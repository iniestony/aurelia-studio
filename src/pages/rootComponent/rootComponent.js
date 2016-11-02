export class RootComponent {

  configureRouter(config, router) {
    config.title = 'Transwarp Governor';
    config.map([
      { route: ["/", "/dashboard"], name: "dashboard", moduleId: "../dashboard/dashboard", nav: true, title: "仪表盘"},
      { route: ["/management"], name: "management", moduleId: "../management/management", nav: true, title: "管理"}
    ]);

    this.router = router;
  }
}
