import clsx from 'clsx';

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center gap-8 px-6 py-4">
      <a href="/" title="crunchyroll">
        <img src="/i/beta/header/logo.png" width={126} />
      </a>
      <div className="flex flex-row gap-4">
        <HeaderLink href="/userdash" title="User Dash">
          User Dash
        </HeaderLink>
        <HeaderLink href="/premium_memberships" title="Premium Membership">
          Premium Membership
        </HeaderLink>
        <HeaderLink href="/billing_lookup/credit_card" title="Billing Lookup">
          Billing Lookup
        </HeaderLink>
        <HeaderLink href="/block_ip_signups" title="Block IP Signups">
          Block IP Signups
        </HeaderLink>
        <HeaderLink href="/banned_domains" title="Banned Domains">
          Banned Domains
        </HeaderLink>
        <HeaderLink
          href="/free_trial_eligibility/bypass_by_user"
          title="Free Trial Eligibility"
        >
          Free Trial Eligibility Bypass
        </HeaderLink>
        <HeaderLink href="/geo_ip_lookup" title="GeoIP Lookup">
          GeoIP Lookup
        </HeaderLink>
        <HeaderLink href="/partner_linking" title="GeoIP Lookup">
          Partner Linking
        </HeaderLink>
        <HeaderLink href="/coupon_redemptions" title="Coupon Redemptions">
          Coupon Redemptions
        </HeaderLink>
      </div>
    </header>
  );
};

const HeaderLink = ({ href, title, children }) => {
  const isActive = href === window.location.pathname;

  return (
    <a
      className={clsx(
        'text-sm hover:text-gray-900',
        isActive ? 'text-gray-900' : 'text-gray-400'
      )}
      href={href}
      title={title}
    >
      {children}
    </a>
  );
};

export default Header;
