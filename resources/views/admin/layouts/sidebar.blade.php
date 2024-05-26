<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar">
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link @if (request()->routeIs('admin.index')) active @endif" aria-current="page" href="{{route('admin.index')}}">
                    <i class="fas fa-dashboard"></i>
                    Dashboard
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link  @if (request()->routeIs('admin.categories.index')) active @endif" aria-current="page" href="{{route('admin.categories.index')}}">
                    <i class="fas fa-bars"></i>
                    Categories
                </a>
            </li>
        </ul>
    </div>
</nav>
