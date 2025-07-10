import React, { useState } from "react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for beginners",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "1 Blog",
        "5 Posts per month",
        "Basic templates",
        "Community support",
        "Basic analytics",
        "SSL certificate",
      ],
      buttonText: "Get Started Free",
      buttonStyle:
        "border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
      popular: false,
    },
    {
      name: "Professional",
      description: "For growing bloggers",
      monthlyPrice: 19,
      yearlyPrice: 183,
      features: [
        "5 Blogs",
        "Unlimited posts",
        "Premium templates",
        "Priority support",
        "Advanced analytics",
        "Custom domain",
        "Email integration",
        "SEO optimization",
      ],
      buttonText: "Start Professional",
      buttonStyle:
        "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and agencies",
      monthlyPrice: 49,
      yearlyPrice: 471,
      features: [
        "Unlimited blogs",
        "Unlimited posts",
        "All templates",
        "24/7 phone support",
        "Advanced analytics",
        "White-label options",
        "API access",
        "Team collaboration",
        "Custom integrations",
      ],
      buttonText: "Contact Sales",
      buttonStyle:
        "border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
      popular: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include our core
            features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="relative bg-white rounded-full p-1 shadow-lg border border-gray-200">
              <div className="flex items-center">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isYearly
                      ? "text-white bg-purple-600 shadow-md"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    isYearly
                      ? "text-white bg-purple-600 shadow-md"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
            {isYearly && (
              <div className="ml-4 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full animate-pulse">
                Save 20%
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                plan.popular ? "ring-2 ring-purple-600 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-1">
                      {plan.monthlyPrice === 0
                        ? ""
                        : `/${isYearly ? "year" : "month"}`}
                    </span>
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      ${plan.monthlyPrice}/month billed annually
                    </p>
                  )}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mb-8 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto text-left">
            <div className="grid gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I change plans anytime?
                </h4>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Is there a free trial?
                </h4>
                <p className="text-gray-600">
                  Our Starter plan is completely free forever. Premium plans
                  come with a 14-day free trial.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers
                  for annual plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
