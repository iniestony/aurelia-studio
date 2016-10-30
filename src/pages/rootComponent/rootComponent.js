export class RootComponent {

  configureRouter(config, router) {
    config.title = 'Transwarp Studio';
    config.map([
      { route: ["/", "/dashboard"], name: "dashboard", moduleId: "../dashboard/dashboard", nav: true, title: "仪表盘"}
    ]);

    this.router = router;
  }
}
