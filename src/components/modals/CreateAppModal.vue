<template>
  <!--begin::Modal - Create App-->
  <div
    class="modal fade"
    id="kt_modal_create_app"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>Create App</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotone/Navigation/Close.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <!--begin::Stepper-->
          <div
            class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
            id="kt_modal_create_app_stepper"
            ref="createAppRef"
          >
            <!--begin::Aside-->
            <div
              class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px"
            >
              <!--begin::Nav-->
              <div class="stepper-nav ps-lg-10">
                <!--begin::Step 1-->
                <div class="stepper-item current" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">1</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      Details
                    </h3>

                    <div class="stepper-desc">
                      Name your App
                    </div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>
                  <!--begin::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      Frameworks
                    </h3>

                    <div class="stepper-desc">
                      Define your app framework
                    </div>
                  </div>
                  <!--begin::Label-->
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">3</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      Database
                    </h3>

                    <div class="stepper-desc">
                      Select the app database type
                    </div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">4</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      Billing
                    </h3>

                    <div class="stepper-desc">
                      Provide payment details
                    </div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 4-->

                <!--begin::Step 5-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">5</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      Release
                    </h3>

                    <div class="stepper-desc">
                      Review and Submit
                    </div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 5-->
              </div>
              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Form-->
              <form
                class="form"
                novalidate="novalidate"
                id="kt_modal_create_app_form"
                @submit.prevent="formSubmit"
              >
                <!--begin::Step 1-->
                <div class="current" data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
                        <span class="required">App Name</span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Specify your unique app name"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <el-input
                        type="text"
                        name="appName"
                        placeholder=""
                        v-model="appName"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          {{ appNameError }}
                        </div>
                      </div>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span class="required">Category</span>

                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Select your app category"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin:Options-->
                      <div class="fv-row">
                        <!--begin:Option-->
                        <label class="d-flex flex-stack mb-5 cursor-pointer">
                          <!--begin:Label-->
                          <span class="d-flex align-items-center me-2">
                            <!--begin:Icon-->
                            <span class="symbol symbol-50px me-6">
                              <span class="symbol-label bg-light-primary">
                                <span
                                  class="svg-icon svg-icon-1 svg-icon-primary"
                                >
                                  <inline-svg
                                    src="media/icons/duotone/Home/Globe.svg"
                                  />
                                </span>
                              </span>
                            </span>
                            <!--end:Icon-->

                            <!--begin:Info-->
                            <span class="d-flex flex-column">
                              <span class="fw-bolder fs-6"
                                >Quick Online Courses</span
                              >

                              <span class="fs-7 text-muted"
                                >Creating a clear text structure is just one
                                SEO</span
                              >
                            </span>
                            <!--end:Info-->
                          </span>
                          <!--end:Label-->

                          <!--begin:Input-->
                          <span
                            class="form-check form-check-custom form-check-solid"
                          >
                            <input
                              class="form-check-input"
                              type="radio"
                              checked
                              name="category"
                              value="1"
                              v-model="data.appType"
                            />
                          </span>
                          <!--end:Input-->
                        </label>
                        <!--end::Option-->

                        <!--begin:Option-->
                        <label class="d-flex flex-stack mb-5 cursor-pointer">
                          <!--begin:Label-->
                          <span class="d-flex align-items-center me-2">
                            <!--begin:Icon-->
                            <span class="symbol symbol-50px me-6">
                              <span class="symbol-label bg-light-danger ">
                                <span
                                  class="svg-icon svg-icon-1 svg-icon-danger"
                                >
                                  <inline-svg
                                    src="media/icons/duotone/Layout/Layout-4-blocks-2.svg"
                                  />
                                </span>
                              </span>
                            </span>
                            <!--end:Icon-->

                            <!--begin:Info-->
                            <span class="d-flex flex-column">
                              <span class="fw-bolder fs-6"
                                >Face to Face Discussions</span
                              >

                              <span class="fs-7 text-muted"
                                >Creating a clear text structure is just one
                                aspect</span
                              >
                            </span>
                            <!--end:Info-->
                          </span>
                          <!--end:Label-->

                          <!--begin:Input-->
                          <span
                            class="form-check form-check-custom form-check-solid"
                          >
                            <input
                              class="form-check-input"
                              type="radio"
                              name="category"
                              value="2"
                              v-model="data.appType"
                            />
                          </span>
                          <!--end:Input-->
                        </label>
                        <!--end::Option-->

                        <!--begin:Option-->
                        <label class="d-flex flex-stack cursor-pointer">
                          <!--begin:Label-->
                          <span class="d-flex align-items-center me-2">
                            <!--begin:Icon-->
                            <span class="symbol symbol-50px me-6">
                              <span class="symbol-label bg-light-success">
                                <span
                                  class="svg-icon svg-icon-1 svg-icon-success"
                                >
                                  <inline-svg
                                    src="media/icons/duotone/Devices/Watch1.svg"
                                  />
                                </span>
                              </span>
                            </span>
                            <!--end:Icon-->

                            <!--begin:Info-->
                            <span class="d-flex flex-column">
                              <span class="fw-bolder fs-6"
                                >Full Intro Training</span
                              >

                              <span class="fs-7 text-muted"
                                >Creating a clear text structure
                                copywriting</span
                              >
                            </span>
                            <!--end:Info-->
                          </span>
                          <!--end:Label-->

                          <!--begin:Input-->
                          <span
                            class="form-check form-check-custom form-check-solid"
                          >
                            <input
                              class="form-check-input"
                              type="radio"
                              name="category"
                              value="3"
                              v-model="data.appType"
                            />
                          </span>
                          <!--end:Input-->
                        </label>
                        <!--end::Option-->
                      </div>
                      <!--end:Options-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span class="required">Select Framework</span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Specify your apps framework"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-warning">
                              <i class="fab fa-html5 text-warning fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">HTML5</span>

                            <span class="fs-7 text-muted">Base Web Projec</span>
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            checked
                            name="framework"
                            value="1"
                            v-model="data.framework"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-success">
                              <i class="fab fa-react text-success fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">ReactJS</span>
                            <span class="fs-7 text-muted"
                              >Robust and flexible app framework</span
                            >
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="framework"
                            value="2"
                            v-model="data.framework"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-danger">
                              <i class="fab fa-angular text-danger fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">Angular</span>
                            <span class="fs-7 text-muted"
                              >Powerful data mangement</span
                            >
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="framework"
                            value="3"
                            v-model="data.framework"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-primary">
                              <i class="fab fa-vuejs text-primary fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">Vue</span>
                            <span class="fs-7 text-muted"
                              >Lightweight and responsive framework</span
                            >
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="framework"
                            value="4"
                            v-model="data.framework"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2">
                        Database Name
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <el-input
                        type="text"
                        name="dbname"
                        placeholder=""
                        v-model="dbName"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          {{ dbNameError }}
                        </div>
                      </div>
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span class="required">Select Database Engine</span>

                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Select your app database engine"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin::Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin::Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-success">
                              <i class="fas fa-database text-success fs-2x"></i>
                            </span>
                          </span>
                          <!--end::Icon-->

                          <!--begin::Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">MySQL</span>

                            <span class="fs-7 text-muted"
                              >Basic MySQL database</span
                            >
                          </span>
                          <!--end::Info-->
                        </span>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="dbengine"
                            checked
                            value="1"
                            v-model="data.dbType"
                          />
                        </span>
                        <!--end::Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin::Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin::Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-danger">
                              <i class="fab fa-google text-danger fs-2x"></i>
                            </span>
                          </span>
                          <!--end::Icon-->

                          <!--begin::Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">Firebase</span>

                            <span class="fs-7 text-muted"
                              >Google based app data management</span
                            >
                          </span>
                          <!--end::Info-->
                        </span>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="dbengine"
                            value="2"
                            v-model="data.dbType"
                          />
                        </span>
                        <!--end::Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer">
                        <!--begin::Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin::Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-warning">
                              <i class="fab fa-amazon text-warning fs-2x"></i>
                            </span>
                          </span>
                          <!--end::Icon-->

                          <!--begin::Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">DynamoDB</span>

                            <span class="fs-7 text-muted"
                              >Amazon Fast NoSQL Database</span
                            >
                          </span>
                          <!--end::Info-->
                        </span>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <span
                          class="form-check form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="dbengine"
                            value="3"
                            v-model="data.dbType"
                          />
                        </span>
                        <!--end::Input-->
                      </label>
                      <!--end::Option-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-7 fv-row">
                      <!--begin::Label-->
                      <label
                        class="d-flex align-items-center fs-6 fw-bold form-label mb-2"
                      >
                        <span class="required">Name On Card</span>
                        <i
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                          title="Specify a card holder's name"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <el-input
                        type="text"
                        class="form-control-solid"
                        placeholder=""
                        name="card_name"
                        v-model="data.billings.nameOnCard"
                      />
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-7 fv-row">
                      <!--begin::Label-->
                      <label class="required fs-6 fw-bold form-label mb-2"
                        >Card Number</label
                      >
                      <!--end::Label-->

                      <!--begin::Input wrapper-->
                      <div class="position-relative">
                        <!--begin::Input-->
                        <el-input
                          type="text"
                          class="form-control-solid"
                          placeholder="Enter card number"
                          name="card_number"
                          v-model="data.billings.cardNumber"
                        />
                        <!--end::Input-->

                        <!--begin::Card logos-->
                        <div
                          class="position-absolute translate-middle-y top-50 end-0 me-5"
                        >
                          <img
                            src="media/svg/card-logos/visa.svg"
                            alt=""
                            class="h-25px"
                          />
                          <img
                            src="media/svg/card-logos/mastercard.svg"
                            alt=""
                            class="h-25px"
                          />
                          <img
                            src="media/svg/card-logos/american-express.svg"
                            alt=""
                            class="h-25px"
                          />
                        </div>
                        <!--end::Card logos-->
                      </div>
                      <!--end::Input wrapper-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2"
                          >Expiration Date</label
                        >
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <div class="col-6">
                            <el-select
                              name="card_expiry_month"
                              class="form-select-solid"
                              placeholder="Month"
                              v-model="data.billings.expirationMonth"
                            >
                              <el-option
                                v-for="i in 12"
                                :key="i"
                                :label="i"
                                :value="i"
                              >
                              </el-option>
                            </el-select>
                          </div>
                          <!--end::Col-->

                          <!--begin::Col-->
                          <div class="col-6">
                            <el-select
                              name="card_expiry_year"
                              class="form-select-solid"
                              placeholder="Year"
                              v-model="data.billings.expirationYear"
                            >
                              <el-option
                                v-for="i in 10"
                                :key="i"
                                :label="i + (new Date().getFullYear() - 1)"
                                :value="i"
                              ></el-option>
                            </el-select>
                          </div>
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->

                      <!--begin::Col-->
                      <div class="col-md-4 fv-row">
                        <!--begin::Label-->
                        <label
                          class="d-flex align-items-center fs-6 fw-bold form-label mb-2"
                        >
                          <span class="required">CVV</span>
                          <i
                            class="fas fa-exclamation-circle ms-2 fs-7"
                            data-bs-toggle="tooltip"
                            title="Enter a card CVV code"
                          ></i>
                        </label>
                        <!--end::Label-->

                        <!--begin::Input wrapper-->
                        <div class="position-relative">
                          <!--begin::Input-->
                          <el-input
                            type="text"
                            class="form-control-solid"
                            minlength="3"
                            maxlength="4"
                            placeholder="CVV"
                            name="card_cvv"
                            v-model="data.billings.cvv"
                          />
                          <!--end::Input-->

                          <!--begin::CVV icon-->
                          <div
                            class="position-absolute translate-middle-y top-50 end-0 me-3"
                          >
                            <span class="svg-icon svg-icon-2hx">
                              <inline-svg
                                src="media/icons/duotone/Shopping/Credit-card.svg"
                              />
                            </span>
                          </div>
                          <!--end::CVV icon-->
                        </div>
                        <!--end::Input wrapper-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="d-flex flex-stack">
                      <!--begin::Label-->
                      <div class="me-5">
                        <label class="fs-6 fw-bold form-label"
                          >Save Card for further billing?</label
                        >
                        <div class="fs-7 fw-bold text-gray-400">
                          If you need more info, please check budget planning
                        </div>
                      </div>
                      <!--end::Label-->

                      <!--begin::Switch-->
                      <label
                        class="form-check form-switch form-check-custom form-check-solid"
                      >
                        <el-switch v-model="data.billings.saveCard">
                        </el-switch>
                        <span class="form-check-label fw-bold text-gray-400">
                          Save Card
                        </span>
                      </label>
                      <!--end::Switch-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 4-->

                <!--begin::Step 5-->
                <div data-kt-stepper-element="content">
                  <div class="w-100 text-center">
                    <!--begin::Heading-->
                    <h1 class="fw-bolder text-dark mb-3">Release!</h1>
                    <!--end::Heading-->

                    <!--begin::Description-->
                    <div class="text-muted fw-bold fs-3">
                      Submit your app to kickstart your project.
                    </div>
                    <!--end::Description-->

                    <!--begin::Illustration-->
                    <div class="text-center px-4 py-15">
                      <img
                        src="media/illustrations/todo.png"
                        alt=""
                        class="mw-100 mh-150px"
                      />
                    </div>
                    <!--end::Illustration-->
                  </div>
                </div>
                <!--end::Step 5-->

                <!--begin::Actions-->
                <div class="d-flex flex-stack pt-10">
                  <!--begin::Wrapper-->
                  <div class="me-2">
                    <button
                      type="button"
                      class="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      @click="previousStep()"
                    >
                      <span class="svg-icon svg-icon-3 me-1">
                        <inline-svg
                          src="media/icons/duotone/Navigation/Left-2.svg"
                        />
                      </span>
                      Back
                    </button>
                  </div>
                  <!--end::Wrapper-->

                  <!--begin::Wrapper-->
                  <div>
                    <button
                      type="submit"
                      class="btn btn-lg btn-primary"
                      data-kt-stepper-action="submit"
                    >
                      <span class="indicator-label">
                        Submit
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                          <inline-svg
                            src="icons/duotone/Navigation/Right-2.svg"
                          />
                        </span>
                      </span>
                      <span class="indicator-progress">
                        Please wait...
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        ></span>
                      </span>
                    </button>

                    <button
                      type="button"
                      class="btn btn-lg btn-primary"
                      data-kt-stepper-action="next"
                      @click="nextStep()"
                    >
                      Continue
                      <span class="svg-icon svg-icon-3 ms-1 me-0">
                        <inline-svg
                          src="media/icons/duotone/Navigation/Right-2.svg"
                        />
                      </span>
                    </button>
                  </div>
                  <!--end::Wrapper-->
                </div>
                <!--end::Actions-->
              </form>
              <!--end::Form-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  background-color: #f2f2f3;
}

.el-input__inner {
  background-color: #f2f2f3;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent.ts";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";

interface KTApp {
  appName: string;
  appType: string;
  framework: string;
  dbName: string;
  dbType: string;
  billings: {
    nameOnCard: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
    saveCard: boolean;
  };
}

export default defineComponent({
  name: "create-app",
  components: {},
  setup() {
    // Initialize Stepper
    const _stepperObj = ref<StepperComponent | null>(null);

    const createAppRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createAppRef.value as HTMLElement
      );
    });

    // Create a form validation schema
    const createAppSchema = {
      appName: Yup.string()
        .required()
        .label("App name"),
      dbName: Yup.string()
        .required()
        .label("Database name")
    };

    // Create a form context with the validation schema
    useForm({
      validationSchema: createAppSchema
    });

    const {
      value: appName,
      errorMessage: appNameError,
      validate: validateAppName
    } = useField("appName");
    const {
      value: dbName,
      errorMessage: dbNameError,
      validate: validateDbName
    } = useField("dbName");

    //form data
    const data = ref<KTApp>({
      appName: "",
      appType: "1",
      framework: "1",
      dbName: "",
      dbType: "1",
      billings: {
        nameOnCard: "Max Doe",
        cardNumber: "4111 1111 1111 1111",
        expirationMonth: "2",
        expirationYear: "2021",
        cvv: "123",
        saveCard: true
      }
    });

    const handleStep = (validate, stepper) => {
      validate().then(result => {
        if (result.valid) {
          stepper.value.goNext();
        } else {
          Swal.fire({
            text:
              "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger"
            }
          });
        }
      });
    };

    const nextStep = async () => {
      if (!_stepperObj.value) {
        return;
      }

      if (_stepperObj.value.getCurrentStepIndex() === 1) {
        data.value.appName = appName.value as string;
        await handleStep(validateAppName, _stepperObj);
        return;
      } else {
        if (_stepperObj.value.getCurrentStepIndex() === 3) {
          data.value.dbName = dbName.value as string;
          await handleStep(validateDbName, _stepperObj);
          return;
        }
      }
      _stepperObj.value.goNext();
    };

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goPrev();
    };

    const formSubmit = () => {
      Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary"
        }
      }).then(() => {
        window.location.reload();
      });
    };

    return {
      formSubmit,
      appName,
      appNameError,
      dbName,
      dbNameError,
      data,
      nextStep,
      previousStep,
      createAppRef
    };
  }
});
</script>
